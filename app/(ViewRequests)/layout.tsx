import React from "react";
import { Stack } from "expo-router";

const ViewRequestsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="view/:id" />
    </Stack>
  );
};

export default ViewRequestsLayout;
