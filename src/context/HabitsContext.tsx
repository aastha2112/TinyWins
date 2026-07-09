import { createContext, useContext, useEffect, useState } from "react";
import { Habit } from "@/types/habit.types";
import { habitService } from "@/services/habitService";
import { Alert } from "react-native";

export interface HabitContextInterface{
    habits: Habit[],
    isLoading: boolean,
    fetchHabits: ()=> void,
    createHabit:(payload: any)=> void,
    updateHabit:(id: string, payload: any)=>void,
    deleteHabit:(id: string)=>void
}

export const HabitContext = createContext<HabitContextInterface>({
    habits: [],
    isLoading: false,
    fetchHabits: ()=> {},
    createHabit:()=> {},
    updateHabit:()=>{},
    deleteHabit:()=>{}
})

const HabitProvider = ({children}: {children: React.ReactNode})=>{

    const [habits, setHabits]= useState<Habit[]>([])
    const [isLoading, setIsLoading]= useState(false)

    useEffect(() => {
        fetchHabits()
      }, [])

    //fetch habits
    const fetchHabits= async()=>{
        setIsLoading(true)
        try {
            const allHabits = await habitService.getHabits()
            setHabits(allHabits)
        } catch (error) {
            Alert.alert("Couldn't fetch habits!", String(error))
        } finally{
        setIsLoading(false)
        }
    }

    // create habit
    const createHabit=async(payload: any)=>{
        setIsLoading(true)
        try {
            await habitService.createHabit(payload)
            await fetchHabits()
        } catch (error) {
            Alert.alert("Couldn't add habit!", String(error))
        } finally{
        setIsLoading(false)
        }
    }

    // update habit
    const updateHabit= async(id: string, payload: any)=>{
        setIsLoading(true)
        try {
            await habitService.updateHabit(id, payload)
            await fetchHabits()
        } catch (error) {
            Alert.alert("Couldn't update habit!", String(error))
        } finally{
        setIsLoading(false)
        }
    }

    const deleteHabit=async(id: string)=>{
        setIsLoading(true)
        try {
            await habitService.deleteHabit(id)
            await fetchHabits()
        } catch (error) {
            Alert.alert("Couldn't delete habit!", String(error))
        } finally{
        setIsLoading(false)
        }
    }


    return (
        <HabitContext.Provider value = {{habits, isLoading, fetchHabits, createHabit, updateHabit, deleteHabit}}>{children}</HabitContext.Provider>
    )
}

export default HabitProvider

export const useHabits = ()=>{
    return useContext(HabitContext)
}