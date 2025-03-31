plugins {
  kotlin("jvm") version "1.9.10"
  kotlin("plugin.serialization") version "1.9.10"
  application
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("io.ktor:ktor-client-core:2.3.4")
  implementation("io.ktor:ktor-client-cio:2.3.4")
  implementation("io.ktor:ktor-client-content-negotiation:2.3.4")
  implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.4")
  implementation("org.slf4j:slf4j-simple:2.0.9")
}

application {
  mainClass.set("MainKt")
}