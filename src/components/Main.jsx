import react from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Button } from "native-base";

const Main = () => {
return(
    <NativeBaseProvider>
      <Box alignItems="center">
      <Button onPress={() => console.log("hello world")}>Click Me</Button>
    </Box>
    </NativeBaseProvider>

)
}

export default Main