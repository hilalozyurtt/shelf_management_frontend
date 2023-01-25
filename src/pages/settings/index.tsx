import SettingsScreen from "@/components/settings/SettingsTable"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()

  return (
    <div className="overflow-auto">
      <SettingsScreen />
    </div>
  )
}