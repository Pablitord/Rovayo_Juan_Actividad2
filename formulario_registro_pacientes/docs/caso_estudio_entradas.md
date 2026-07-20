# Caso de Estudio: Formulario de Registro de Pacientes (Clínica San José)

Este archivo contiene el contexto del caso de estudio, el formulario antiguo deficiente y la estructura de preguntas que deben responder en su entregable.

---

## Contexto del Caso

La **Clínica San José** busca digitalizar y agilizar el registro de pacientes en el área de admisión. El personal administrativo y los pacientes se quejan constantemente del sistema antiguo. Al ingresar los datos, ocurren errores tipográficos graves (ej. correos mal escritos, números de teléfono incompletos, o formatos de fecha erróneos), lo que bloquea la facturación y el contacto de emergencia.

Además, el sistema es confuso. Por ejemplo, los pacientes adultos deben llenar campos obligatorios del "Representante Legal" con datos vacíos o guiones, y quienes no tienen seguro médico deben escribir manualmente "NO TIENE" en campos de póliza para poder continuar.

## El Formulario Actual (Sistema Heredado)

El formulario se presenta en una sola pantalla larga de texto sin secciones ni validaciones en tiempo real:

```text
=================================================================================
 FORMULARIO DE INGRESO DE PACIENTES - CLINICA SAN JOSÉ (SISTEMA ANTERIOR)
=================================================================================
Instrucciones: Rellene todos los campos obligatorios en mayúsculas. 
Si hay algún error, el formulario se reiniciará para proteger los datos.

[ Campo 1 ] ID PACIENTE (Escriba un número): [                     ]
[ Campo 2 ] NOMBRE COMPLETO: [                                     ]
[ Campo 3 ] FECHA DE NACIMIENTO (Escriba dd/mm/aaaa): [            ]
[ Campo 4 ] EDAD (Escriba solo números): [                         ]
[ Campo 5 ] GÉNERO (Escriba F o M o Otro): [                       ]
[ Campo 6 ] CORREO ELECTRÓNICO: [                                  ]
[ Campo 7 ] TELÉFONO: [                                            ]
[ Campo 8 ] DIRECCIÓN DOMICILIARIA: [                              ]
[ Campo 9 ] PAÍS DE ORIGEN: [                                      ]
[ Campo 10] TIPO DE SANGRE (Escriba A+, O-, etc.): [               ]
[ Campo 11] ¿TIENE SEGURO MÉDICO? (Escriba SI o NO): [             ]
[ Campo 12] NOMBRE DE LA ASEGURADORA: [                            ]
[ Campo 13] NÚMERO DE PÓLIZA DE SEGURO: [                          ]
[ Campo 14] NOMBRE COMPLETO DEL REPRESENTANTE LEGAL: [             ]
[ Campo 15] TELÉFONO DEL REPRESENTANTE LEGAL: [                    ]
[ Campo 16] SÍNTOMAS PRINCIPALES / MOTIVO DE CONSULTA: [           ]
[ Campo 17] FECHA DE INGRESO AL HOSPITAL (dd/mm/aaaa): [           ]
[ Campo 18] HORA DE INGRESO AL HOSPITAL (hh:mm): [                 ]

[ BOTÓN: GUARDAR TODO ]     [ BOTÓN: RESETEAR FORMULARIO ]
=================================================================================
```

---

## 📝 Plantilla de Entrega para Estudiantes
*(Utilicen este formato para estructurar el archivo `README.md` de su repositorio de GitHub o su reporte de entrega)*

**Nombres de los Integrantes:** __________________________________________________

### Paso 1: Análisis de Deficiencias y Selección de Controles
*Basándose en la teoría de diseño de entradas, identifiquen **3 fallas críticas** del formulario antiguo y propongan qué control de formulario moderno usarían para solucionarlas:*

1. **Deficiencia 1 (Ej. Captura ineficiente de opciones cerradas):**
   * *Descripción del problema:* _____________________________________________________
   * *Control propuesto (ej. Radio, Select, Toggle) y justificación:* __________________

2. **Deficiencia 2 (Ej. Falta de campos condicionales):**
   * *Descripción del problema:* _____________________________________________________
   * *Control/Lógica propuesta y justificación:* ________________________________________

3. **Deficiencia 3 (Ej. Captura manual de fechas o datos redundantes):**
   * *Descripción del problema:* _____________________________________________________
   * *Control/Lógica propuesta y justificación:* ________________________________________

---

### Paso 2: Tabla de Respuesta a Eventos (Event-Response Table)
*Diseñen una tabla que documente cómo reaccionará el nuevo formulario dinámico a las acciones del usuario para evitar errores de captura (definan al menos 3 eventos clave, ej. cambio de edad, cambio de opción de seguro, click en guardar con campos vacíos):*

| Evento del Usuario | Acción del Sistema | Feedback Visual en Pantalla | Feedback Textual (Mensajes) |
| :--- | :--- | :--- | :--- |
| *Ej. Ingresa edad menor a 18 años* | *Muestra sección de Representante* | *Despliega campos de representante de forma suave* | *"Se requieren datos del representante legal"* |
| | | | |
| | | | |
| | | | |

---

### Paso 3: Justificación Teórica del Diseño
*Expliquen cómo aplicaron la teoría del diseño de entradas en su propuesta digital:*

1. **Modelo Conceptual de la Entrada:**
   * **Información (Qué capturar):** ¿Qué campos decidieron eliminar, automatizar (ej. autocompletar hora/fecha de ingreso) o reorganizar?
     * *Respuesta:* ____________________________________________________________________
   * **Presentación (Cómo capturar):** ¿Cómo dividieron el formulario para evitar sobrecarga (ej. pasos, pestañas, grupos)?
     * *Respuesta:* ____________________________________________________________________
   * **Contexto (Quién y Dónde):** ¿Cómo influye el hecho de que sea usado por recepcionistas ocupados (alta velocidad) y pacientes en un móvil (pantallas pequeñas)?
     * *Respuesta:* ____________________________________________________________________

2. **Principios de Diseño y Color Aplicados:**
   * ¿Cómo aplicaron el principio **KISS (Simplicidad)** y la **consistencia** en su diseño?
     * *Respuesta:* ____________________________________________________________________
   * Expliquen el uso estratégico del color y el contraste (conforme a la accesibilidad WCAG) para alertar sobre errores de validación sin excluir a usuarios daltónicos.
     * *Respuesta:* ____________________________________________________________________

---

### Paso 4: Evidencia del Diseño Digital (Entregable)
*Agreguen aquí la información sobre el formato en el que desarrollaron el diseño digital:*

*   **Tecnología/Herramienta utilizada:** (Ej. Figma, Miro, HTML/Tailwind CSS, React, etc.)
*   **Enlace al Prototipo Digital (si aplica):** [Enlace al prototipo interactivo]
*   **Instrucciones para visualizar el diseño:** (Ej. "Ver captura `registro_formulario.png` en la raíz", o "Abrir `index.html` en el navegador").
