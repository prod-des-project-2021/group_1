import { Box } from "@mui/material"
import { ReactNode } from "react"

interface InterfaceWrapperProps {
    children: ReactNode
}

const Wrapper = ({children} : InterfaceWrapperProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: "10px 10px",
            justifyContent: "center"
        }}>
            {children}
        </Box>
    )
}

export default Wrapper
