import { createContext, useState } from "react";

export default createContext<ReturnType<typeof useState<string>>>(null);
