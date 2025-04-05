import kotlinx.coroutines.runBlocking
import java.util.Properties
import java.io.FileInputStream
import kotlinx.coroutines.runBlocking

val properties = Properties().apply {
  load(FileInputStream("config.properties"))
}

val webhookUrl = properties.getProperty("discord.webhook.url")
  ?: throw IllegalStateException("Webhook URL not found in config.properties")

val token = properties.getProperty("discord.token")
  ?: throw IllegalStateException("Token not found in config.properties")

fun main() {
  val discordClient = DiscordClient(token)

  runBlocking {
    discordClient.connectToGateway()
  }
}