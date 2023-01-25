import SettingsTable from "@/components/settings/SettingsTable"

export default function Home() {

  return (
    <div className="overflow-auto">
      <h1 className="text-2xl font-bold ">
       Sistem Parametreleri
      </h1>
      <hr />
      <SettingsTable />
    </div>
  )

}