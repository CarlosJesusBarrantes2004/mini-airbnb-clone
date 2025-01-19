import React from "react";
import AuthProvider from "./auth/AuthProvider";
import PropertyProvider from "./property/PropertyProvider";
import MessageProvider from "./message/MessageProvider";
import BookingProvider from "./booking/BookingProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MessageProvider>
      <AuthProvider>
        <PropertyProvider>
          <BookingProvider>{children}</BookingProvider>
        </PropertyProvider>
      </AuthProvider>
    </MessageProvider>
  );
};

export default AppProvider;
