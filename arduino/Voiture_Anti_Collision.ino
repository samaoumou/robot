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
/*                           le 11/04/2023 par Issa NDIAYE                              */
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
boolean relayState = true; // permet de gerer la ligne droite
boolean motorState = false; // permet de controller les pivot
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

   //partie commande

    if (Serial.available() > 0) { //Vérifier si des données sont disponible au niveau du serial port
    char data = Serial.read(); // Lecture des données entrant
    // Si la donnée entrante est un nombre elle concerne la ligne droite
    // sinon si c'est un caractère elle concerne le moteur 
    if (isdigit(data)) {
      AvanceEnLigneDroite();
    } else if(isdigit(data)){
    relayState = (data=='1');
      DemiTour();
  }   else if (isAlpha(data)) {
      motorState = (data == 'o');
      PivoteAGauche();
  }   else if (isAlpha(data)) {
      motorState = (data == 'f');
      PivoteADroite();
  }   else if (isAlpha(data)) {
      motorState = (data == 'a');
      Arret();
    }
}
}

      
