package chung.com.controlledbyesp8266.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import org.json.JSONObject;

import java.util.List;

import chung.com.controlledbyesp8266.Model.Light;
import chung.com.controlledbyesp8266.R;
import chung.com.controlledbyesp8266.Utils.LightConvert;
import chung.com.controlledbyesp8266.View.MainActivity;

/**
 * Created by chuna on 25/03/2018.
 */

public class LightAdapter extends BaseAdapter {

    private List<Light> lightList;
    private LayoutInflater inflater;
    private Context context;

    public LightAdapter(List<Light> lightList, LayoutInflater inflater, Context context) {
        this.lightList = lightList;
        this.inflater = inflater;
        this.context = context;
    }

    @Override
    public int getCount() {
        return lightList.size();
    }

    @Override
    public Object getItem(int position) {
        return lightList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    class ViewHolder {
        TextView txtLed;
        Switch switchControl;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if (convertView == null) {
            convertView = inflater.inflate(R.layout.row_listview, null);
            holder = new ViewHolder();
            holder.txtLed = convertView.findViewById(R.id.txtLed);
            holder.switchControl = convertView.findViewById(R.id.switchControl);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        final Light light = lightList.get(position);
        holder.txtLed.setText(light.getName());
        holder.switchControl.setChecked(light.isState());
        holder.switchControl.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                light.setState(isChecked);
                String s = "{'id':1,'name':'LED 1','state':" + light.isState() + "}";
                MainActivity.mSocket.emit("led-change", s);
            }
        });
        return convertView;
    }
}
