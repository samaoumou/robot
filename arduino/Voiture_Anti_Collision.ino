/***********************************************************************************************/
/*                        VOITURE AUTOMATISÉE ANTI-COLLISION v1.0                              */
/*                                                                                             */
/*                La voiture explore en ligne droite et évite les obstacles.                   */ 
/*                                                                                             */
/*                <!> Modifier le fichier "configuration.h" si nécessaire.<!>                  */
/*                                                                                             */
/*                                     Rev SW: v1.0                                            */
/*                              Version HW compatible: v1.0                                    */
/*                                                                                             */
/*                           le 27/02/2015 par Alexandre Pailhoux                              */
/*                                                                                             */
/* http://les-electroniciens.com/videos/realisation-voiture-automatisee-anti-collision-arduino */
/***********************************************************************************************/

/*****************************************************************/
/*                         LIBRAIRIES                            */
/*****************************************************************/
#include <Servo.h> 
#include "Arduino.h"
#include "AffectationDesEntreesSorties.h"
#include "DeclarationDesVariables.h"
#include "Configuration.h"
#include "DriverLEDs.h"
#include "DriverMoteur.h"
#include "DriverServo.h"
#include "DriverUltraSonicSensor.h"
#include "Initialisation.h"
#include "AlgorithmeQuiChercheUneIssue.h"

/*****************************************************************/
/*                        INITIALISATION                         */
/*****************************************************************/
void setup() {Initialisation();}

/*****************************************************************/
/*                                                               */
/*                        BOUCLE INFINIE                         */
/*                Algorithme définit dans la vidéo.              */
/*                                                               */
/*****************************************************************/
void loop() {   
   RegardeToutDroit(); 
   if(LaVoieEstLibre())
   {
     RegardeAGauche();      
     if(LaVoieEstLibre()) 
     { 
       RegardeToutDroit();       
       if(LaVoieEstLibre()) 
       {
         RegardeADroite();          
         if(LaVoieEstLibre()) 
         {
           if(laVoitureEstAlArret)
           {AvanceEnLigneDroite();}
         }
         else{ChercheUneIssue();}
       }
       else{ChercheUneIssue();}
     }     
     else{ChercheUneIssue();} 
   }  
   else{ChercheUneIssue();} 
   delay(1);
}
