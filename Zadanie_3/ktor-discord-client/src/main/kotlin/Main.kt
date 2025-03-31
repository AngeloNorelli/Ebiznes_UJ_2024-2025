import kotlinx.coroutines.runBlocking
import java.util.Properties
import java.io.FileInputStream

val properties = Properties().apply {
  load(FileInputStream("config.properties"))
}

val webhookUrl = properties.getProperty("discord.webhook.url")
  ?: throw IllegalStateException("Webhook URL not found in config.properties")

fun main() {
  val discordClient = DiscordClient(webhookUrl)

  runBlocking {
    val response = discordClient.sendMessage("Hello, Discord!")
    println("Response status: ${response.status}")
  }
}