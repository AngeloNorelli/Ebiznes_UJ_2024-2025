package controllers

import play.api.libs.json.{Json, OFormat}
import play.api.mvc._
import javax.inject._

import scala.collection.mutable

case class Category(id: Long, name: String, description: String)

object Category {
  implicit val categoryFormat: OFormat[Category] = Json.format[Category]
}

@Singleton
class CategoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val categories = mutable.ListBuffer[Category](
    Category(1, "Electronics", "Devices and gadgets"),
    Category(2, "Clothing", "Apparel and accessories")
  )

  def getAll: Action[AnyContent] = Action {
    Ok(Json.toJson(categories))
  }

  def getById(id: Long): Action[AnyContent] = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None           => NotFound(Json.obj("error" -> "Category not found"))
    }
  }

  def add: Action[play.api.libs.json.JsValue] = Action(parse.json) { request =>
    request.body.validate[Category].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid category data")),
      category => {
        categories += category
        Created(Json.toJson(category))
      }
    )
  }

  def update(id: Long): Action[play.api.libs.json.JsValue] = Action(parse.json) { request =>
    request.body.validate[Category].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid category data")),
      updatedCategory => {
        categories.indexWhere(_.id == id) match {
          case -1 => NotFound(Json.obj("error" -> s"Category with ID $id not found"))
          case idx =>
            categories.update(idx, updatedCategory)
            Ok(Json.toJson(updatedCategory))
        }
      }
    )
  }

  def delete(id: Long): Action[AnyContent] = Action {
    categories.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("error" -> s"Category with ID $id not found"))
      case idx =>
        categories.remove(idx)
        NoContent
    }
  }
}