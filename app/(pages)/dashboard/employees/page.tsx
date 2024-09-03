import { redirect } from 'next/navigation'
import React from 'react'

export default function Employees() {
    redirect("/dashboard/employees/profile")
}
