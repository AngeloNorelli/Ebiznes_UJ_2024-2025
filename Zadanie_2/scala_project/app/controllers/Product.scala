package controllers

import play.api.libs.json.{Json, OFormat}
import play.api.mvc._
import javax.inject._

import scala.collection.mutable

case class Product(id: Long, name: String, description: String, price: Double)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val products = mutable.ListBuffer[Product](
    Product(1, "Laptop", "A high-performance laptop", 1200.00),
    Product(2, "Smartphone", "A latest-gen smartphone", 800.00)
  )

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(products))
  }

  def getById(id: Long): Action[AnyContent] = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None          => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def add: Action[play.api.libs.json.JsValue] = Action(parse.json) { request => 
    request.body.validate[Product].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid product data")),
      product => {
        products += product
        Created(Json.toJson(product))
      }
    )
  }

  def update(id: Long): Action[play.api.libs.json.JsValue] = Action(parse.json) { request =>
    request.body.validate[Product].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid product data")),
      updatedProduct => {
        products.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("error" -> s"Product with ID $id not found"))
          case idx =>
            products.update(idx, updatedProduct)
            Ok(Json.toJson(updatedProduct))
        }
      }
    )
  }

  def delete(id: Long): Action[AnyContent] = Action {
    products.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("error" -> s"Product with ID $id not found"))
      case idx =>
        products.remove(idx)
        NoContent
    }
  }
}