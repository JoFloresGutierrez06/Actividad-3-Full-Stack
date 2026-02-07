# ACTIVIDAD 3 - DESAROLLO FULL STACK - CUARTO SEMESTRE - UNIVERSIDAD TECMILENIO
Estudiante: Jocelyn Flores Gutiérrez
Maestro: Edgar Ivan Patricio Aizpuru
---------------------------------------------
Contenidos de la actividad 3, con proyecto de "Diseño de backend con reglas de negocio y control de estados". 
---------------------------------------------

OBJETIVO:
Diseñar e implementar un backend con Express y POO que no solo haga CRUD, sino que aplique reglas de negocio reales, separando correctamente responsabilidades entre:
  * routes
  * controllers
  * repositories

--------------------------------------------

ENTIDAD PRINCIPAL: **Pedidos**
  * id          (int)
  * producto    (String)
  * cantidad    (int)
  * estado      (String) - "pendiente" -> "cancelado" / "confirmado"

