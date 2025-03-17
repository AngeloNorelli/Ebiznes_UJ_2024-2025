package main.java;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        try {
            Class.forName("org.sqlite.JDBC");
            Connection connection = DriverManager.getConnection("jdbc:sqlite:test.db");
            Statement statement = connection.createStatement();

            statement.executeUpdate("CREATE TABLE IF NOT EXISTS hello (message TEXT)");
            statement.executeUpdate("INSERT INTO hello (message) VALUES ('Hello, SQLite!')");

            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}