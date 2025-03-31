import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable

class DiscordClient(private val webhookUrl: String) {
  private val client = HttpClient {
    install(ContentNegotiation) {
      json()
    }
  }

  suspend fun sendMessage(content: String): HttpResponse {
    val payload = DiscordMessage(content)
    return client.post(webhookUrl) {
      contentType(ContentType.Application.Json)
      setBody(payload)
    }
  }
}

@Serializable
data class DiscordMessage(val content: String)