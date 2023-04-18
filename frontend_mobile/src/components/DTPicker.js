import React from "react"
import DateTimePicker from '@react-native-community/datetimepicker';

const DTPicker = ({value, onChange}) => {
    return(
        <DateTimePicker
            value={value}
            onChange={onChange}

            mode='datetime'
            display="default"
            textColor={'#ff9900' || undefined}
            accentColor={'#ff9900' || undefined}
            neutralButton={{label: '#ff9900'}}
            negativeButton={{label: 'Cancel', textColor: '#ff9900'}}
            dateFormat="day month year"
            
        />
    )
}

export default DTPicker