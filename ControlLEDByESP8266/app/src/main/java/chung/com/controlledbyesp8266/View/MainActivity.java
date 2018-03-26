package chung.com.controlledbyesp8266.View;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ListAdapter;
import android.widget.ListView;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import chung.com.controlledbyesp8266.Adapter.LightAdapter;
import chung.com.controlledbyesp8266.Model.Light;
import chung.com.controlledbyesp8266.R;
import chung.com.controlledbyesp8266.Utils.LightConvert;

public class MainActivity extends AppCompatActivity {

    private ListView listView;
    private LightAdapter lightAdapter;
    private List<Light> lightList;


    private final String URL_SERVER = "http://192.168.3.6:3000";
    public static final LightConvert lightConvert = new LightConvert(Light.class);
    public static Socket mSocket;

    {
        try {
            mSocket = IO.socket(URL_SERVER);
        } catch (URISyntaxException e) {
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listView = findViewById(R.id.listView);
        lightList = new ArrayList<>();
        lightList.add(new Light(1,"LED 1",false));
        lightAdapter = new LightAdapter(lightList, getLayoutInflater(), this);
        listView.setAdapter(lightAdapter);
        mSocket.connect();
    }
}
