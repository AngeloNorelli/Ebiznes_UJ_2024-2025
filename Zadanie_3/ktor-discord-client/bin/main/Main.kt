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

val botId = properties.getProperty("discord.botId")
  ?: throw IllegalStateException("Bot ID not found in config.properties")

fun main() {
  val discordClient = DiscordClient(webhookUrl, token, botId)

  runBlocking {
    val response = discordClient.sendMessage("Hello from Ktor Discord Client!")
    println("Message sent with status: ${response.status}")
    discordClient.connectToGateway()
  }
}