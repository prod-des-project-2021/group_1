import { Grid, TextField, Typography } from "@mui/material"
import { useField } from "formik"

interface InterfaceTextFieldProps {
    name: string
    label: string
    type: string
}

const InputField = (props: InterfaceTextFieldProps) => {
    const [field, {error}] = useField(props)
    return (
        <Grid item xs={12} marginLeft="20%" padding="10px 10px">
            <TextField {...field} id={field.name} {...props} required style={{width:500}} />
            {error && <Typography variant="caption">{error}</Typography>}
        </Grid>
    )
}

export default InputField
