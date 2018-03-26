#include <ArduinoJson.h>
#include <SocketIOClient.h>



const char* ssid = "BON FPT";
const char* password = "0909363799";
// Server Ip
String host = "192.168.3.6";
// Server port
int port = 3000;

SocketIOClient socket;
 

void setupNetwork() {
    WiFi.persistent(false);
    WiFi.begin(ssid, password);
    uint8_t i = 0;
    while (WiFi.status() != WL_CONNECTED && i++ < 20) delay(500);
    if (i == 21) {
        Serial.println("Can not connect wifi!");
        while (1) delay(500);
    }

    Serial.println("Wifi connected!");
}

void changeLedState(String packet) {
      Serial.println(packet);  
      StaticJsonBuffer<512> jsonBuffer;
      JsonObject& root = jsonBuffer.parseObject(packet);

       
       
      
       boolean state = root["state"];
      if (!state) {
          digitalWrite(LED_BUILTIN, HIGH);
          Serial.println("Led off!");
//          socket.emit("led-change", {});
       } else {
          digitalWrite(LED_BUILTIN, LOW);
          Serial.println("Led on!");
//        socket.emit("led-change", {});
      }
//    }    
}

void setup() {
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.begin(115200);
    setupNetwork();
    socket.emit("list-device", "[{\"id\":1,\"name\":\"LED 1\",\"false\"}]");
    socket.on("led-change", changeLedState);
    socket.connect(host, port);
 }

void loop() {
    socket.monitor();
}










