import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.websocket.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.http.*
import io.ktor.websocket.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonPrimitive

private val categories = listOf(
  "General",
  "Development",
  "Gaming",
  "Music",
  "Art",
  "Science",
  "Sports",
  "Movies",
  "Books",
  "Food"
)

class DiscordClient(private val webhookUrl: String, private val token: String, private val botId: String) {
  private val client = HttpClient {
    install(WebSockets)
    install(ContentNegotiation) {
      json(Json {ignoreUnknownKeys = true})
    }
  }

  suspend fun sendMessage(content: String): HttpResponse {
    val payload = DiscordMessage(content)
    return client.post(webhookUrl) {
      contentType(ContentType.Application.Json)
      setBody(payload)
    }
  }

  suspend fun connectToGateway() {
    client.webSocket("wss://gateway.discord.gg/?v=10&encoding=json") {
      println("Connected to Discord Gateway")
  
      for(frame in incoming) {
        if(frame is Frame.Text) {
          val message = frame.readText()
          handleGatewayMessage(message, this)
        }
      }
    }
  }

  private suspend fun handleGatewayMessage(message: String, session: DefaultClientWebSocketSession) {
    val json = Json.parseToJsonElement(message).jsonObject
    val opCode = json["op"]?.jsonPrimitive?.content?.toIntOrNull()

    when(opCode) {
      10 -> {
        val heartbeatInterval = json["d"]?.jsonObject?.get("heartbeat_interval")?.jsonPrimitive?.content?.toLongOrNull()
        heartbeatInterval?.let { 
          CoroutineScope(Dispatchers.Default).launch {
            session.startHeartbeat(it)
          } 
        }

        val identifyPayload = """
        {
          "op": 2,
          "d": {
            "token": "$token",
            "intents": 33280,
            "properties": {
              "os": "linux",
              "browser": "ktor",
              "device": "ktor"
            }
          }
        }
        """.trimIndent()
        println("Sent identify payload")
        session.send(Frame.Text(identifyPayload))
      }
      0 -> {
        val eventType = json["t"]?.jsonPrimitive?.content
        if(eventType == "MESSAGE_CREATE") {
          val messageData = json["d"]?.jsonObject
          val mentions = messageData?.get("mentions")?.jsonArray

          val isMentioned = mentions?.any { mention ->
            val id = mention.jsonObject["id"]?.jsonPrimitive?.content
            id == botId
          } == true

          if(isMentioned) {
            val content = messageData?.get("content")?.jsonPrimitive?.content ?: "No content"
            val member = messageData?.get("member")?.jsonObject
            val nick = member?.get("nick")?.jsonPrimitive?.content 
              ?: member?.get("author")?.jsonObject?.get("username")?.jsonPrimitive?.content 
              ?: "Unknown"
            val channelId = messageData?.get("channel_id")?.jsonPrimitive?.content ?: "Unknown"
            val timestamp = messageData?.get("timestamp")?.jsonPrimitive?.content ?: "Unknown"

            println("[$timestamp] [$channelId] $nick: $content")
            val cleanedContent = content.replace(Regex("<@!?$botId>"), "").trim()
            println("Cleaned content: $cleanedContent")

            if(cleanedContent == "/category") {
              println("User requested categories")
              val categoriesList = categories.joinToString(separator = "\n") { "- $it" }
              sendMessage("Available categories:\n$categoriesList")
            }
          }
        }
      }
    }
  }

  private suspend fun DefaultClientWebSocketSession.startHeartbeat(interval: Long) {
    delay(interval)
    while(true) {
      send(Frame.Text("""{"op":1,"d":null}"""))
      delay(interval)
    }
  }

  private suspend fun sendMessage(channelId: String, content: String, session: DefaultClientWebSocketSession) {
    val payload = """
      {
        "op": 0,
        "d": {
          "channel_id": "$channelId",
          "content": "$content"
        }
      }
    """.trimIndent()

    session.send(Frame.Text(payload))
  }
}

@Serializable
data class DiscordMessage(val content: String)