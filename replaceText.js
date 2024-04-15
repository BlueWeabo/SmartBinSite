function replaceText() {
    var ssid = document.getElementById("ssid").value;
    var password = document.getElementById("password").value;
    var BinId = document.getElementById("BinId").value;
    var trashCanHeight = document.getElementById("trashCanHeight").value;
    
    var newText = `#include <WiFi.h>
#include <FirebaseESP32.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

const char* ssid = "${ssid}";
const char* password = "${password}";
#define RXD2 16
#define TXD2 17
#define FIREBASE_HOST "https://smartbin-d94f7-default-rtdb.europe-west1.firebasedatabase.app/"
#define FIREBASE_AUTH "96f39500cb59f6f63ca1d780e9a35b10ba1c2633"

#define PERCENTAGE "smarbin/${BinId}/percentage"
#define LONGITUDE "smartbin/${BinId}/location/longitude"
#define LATITUDE "smartbin/${BinId}/location/latitude"

const int trigPin = 5;
const int echoPin = 18;

const float trashCanHeight = ${trashCanHeight};
TinyGPSPlus gps;
FirebaseData firebaseData;
EspSoftwareSerial::UART ss;
void setup() {
  Serial.begin(9600);
  ss.begin(9600, SWSERIAL_8N1, RXD2, TXD2, false);
  if (!ss) {
    Serial.println("Serial initialisation failed");
  }
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Serial.println("Firebase initialized");


  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  delay(3000);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = (duration * 0.034) / 2; 

  float percentage = 0.0f;
  if (distance <= trashCanHeight) {
    percentage = float(((trashCanHeight - distance) / trashCanHeight) * 100);
    Serial.print("Trash can is ");
    Serial.print(percentage);
    Serial.println("% full");

    Firebase.setFloat(firebaseData, PERCENTAGE, percentage);
    Serial.print("Data saved to Firebase: ");
    Serial.println(firebaseData.floatData());
  }

  while (ss.available() > 0) {
    byte bytes = ss.read();
    //Serial.write(bytes);
    gps.encode(bytes);
  }
//  if (millis() > 5000 && gps.charsProcessed() < 10)
//  {
//    Serial.println(F("No GPS detected: check wiring."));
//    while (true);
//  }
  displayInfo();
  Serial.println("");

  delay(1000);
}

void displayInfo()
{
  Serial.print(F("Location: "));
  Serial.print(gps.location.lat(), 6);
  Firebase.setDouble(firebaseData, LATITUDE, gps.location.lat());
  Serial.print(F(","));
  Serial.print(gps.location.lng(), 6);
  Firebase.setDouble(firebaseData, LONGITUDE, gps.location.lng());
  Serial.println(gps.satellites.value());
}`;


    document.getElementById("outputText").innerText = newText;
}
function downloadOutput() {
    var outputText = document.getElementById("outputText").innerText;
    var blob = new Blob([outputText], { type: 'text/plain' });

    
    var downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'output.zip';

    
    document.body.appendChild(downloadLink);

   
    downloadLink.click();

    
    document.body.removeChild(downloadLink);
}
