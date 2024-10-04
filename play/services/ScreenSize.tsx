import { createContext } from "react";

export default createContext<[ string, (value: string) => void ]>(null);
