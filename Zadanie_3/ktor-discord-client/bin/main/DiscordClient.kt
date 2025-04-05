import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.websocket.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.websocket.*
import kotlinx.coroutines.delay
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DiscordClient(private val token: String) {
  private val client = HttpClient {
    install(WebSockets)
    install(ContentNegotiation) {
      json(Json {ignoreUnknownKeys = true})
    }
  }

  suspend fun connectToGateway() {
    client.webSocket("wss://gateway.discord.gg/?v=10&encoding=json") {
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
        heartbeatInterval?.let { session.startHeartbeat(it) }
      }
      0 -> {
        val eventType = json["t"]?.jsonPrimitive?.content
        if(eventType == "MESSAGE_CREATE") {
          val content = json["d"]?.jsonObject?.get("content")?.jsonPrimitive?.content
          println("Received message: $content")
        }
      }
    }
  }

  private suspend fun DefaultClientWebSocketSession.startHeartbeat(interval: Long) {
    while(true) {
      send(Frame.Text("""{"op":1,"d":null}"""))
      delay(interval)
    }
  }
}