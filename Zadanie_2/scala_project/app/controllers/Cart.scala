package controllers

import play.api.libs.json.{Json, OFormat}
import play.api.mvc._
import javax.inject._

import scala.collection.mutable

case class CartItem(productId: Long, quantity: Int)

object CartItem {
  implicit val cartItemFormat: OFormat[CartItem] = Json.format[CartItem]
}

@Singleton
class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val cart = mutable.ListBuffer[CartItem](
    CartItem(1, 2),
    CartItem(2, 1)
  )

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(cart))
  }

  def getById(productId: Long): Action[AnyContent] = Action {
    cart.find(_.productId == productId) match {
      case Some(cartItem) => Ok(Json.toJson(cartItem))
      case None           => NotFound(Json.obj("error" -> "Cart item not found"))
    }
  }

  def add: Action[play.api.libs.json.JsValue] = Action(parse.json) { request =>
    request.body.validate[CartItem].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid cart item data")),
      cartItem => {
        cart.find(_.productId == cartItem.productId) match {
          case Some(existingItem) =>
            existingItem.quantity += cartItem.quantity
            Ok(Json.toJson(existingItem))
          case None =>
            cart += cartItem
            Created(Json.toJson(cartItem))
        }
      }
    )
  }

  def update(productId: Long): Action[play.api.libs.json.JsValue] = Action(parse.json) { request =>
    request.body.validate[CartItem].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid cart item data")),
      updatedCartItem => {
        cart.indexWhere(_.productId == productId) match {
          case -1 => NotFound(Json.obj("error" -> s"Cart item with product ID $productId not found"))
          case idx =>
            cart.update(idx, updatedCartItem)
            Ok(Json.toJson(updatedCartItem))
        }
      }
    )
  }

  def delete(productId: Long): Action[AnyContent] = Action {
    cart.indexWhere(_.productId == productId) match {
      case -1 => NotFound(Json.obj("error" -> s"Cart item with product ID $productId not found"))
      case idx =>
        cart.remove(idx)
        NoContent
    }
  }
}