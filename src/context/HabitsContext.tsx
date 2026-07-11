import { createContext, useContext, useEffect, useState } from "react";
import { Habit } from "@/types/habit.types";
import { habitService } from "@/services/habitService";
import { Alert } from "react-native";
import { winsService } from "@/services/winService";

export interface HabitContextInterface{
    habits: Habit[],
    isLoading: boolean,
    todaysWins: string[],
    fetchHabits: ()=> void,
    createHabit:(payload: any)=> void,
    updateHabit:(id: string, payload: any)=>void,
    deleteHabit:(id: string)=>void,
    toggleHabitToday:(id: string)=>void,
}

export const HabitContext = createContext<HabitContextInterface>({
    habits: [],
    isLoading: false,
    todaysWins: [],
    fetchHabits: ()=> {},
    createHabit:()=> {},
    updateHabit:()=>{},
    deleteHabit:()=>{},
    toggleHabitToday: ()=>{},
})

const HabitProvider = ({children}: {children: React.ReactNode})=>{

    const [habits, setHabits]= useState<Habit[]>([])
    const [isLoading, setIsLoading]= useState(false)
    const [todaysWins, setTodaysWins] = useState<string[]>([])

    useEffect(() => {
        fetchHabits()
        const today = new Date().toISOString().split('T')[0]
        getTodaysWins(today)
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

// delete habit
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

    // fetch wins 
    const getTodaysWins = async (date?: string)=>{
        try{
            const wins= await winsService.getWins(date)
            setTodaysWins(wins.map((win: any) => win.habitId))
        }
        catch (err){
            Alert.alert("Uh Oh! Couldn't get wins!", String(err))
        }
    }

    // toggleWin
    const toggleHabitToday= async (habitId: string)=>{
        try {
            const response = await winsService.toggleWin({habitId})
            if(response.completed){
                setTodaysWins(prev => [...prev, habitId])
            }else{
                setTodaysWins(prev => prev.filter(id => id !== habitId))
            }
        } catch (error) {
            Alert.alert("Uh Oh! Couldn't complete habit!", String(error))
        }
    }


    return (
        <HabitContext.Provider value = {{habits, isLoading, todaysWins, fetchHabits, createHabit, updateHabit, deleteHabit, toggleHabitToday}}>{children}</HabitContext.Provider>
    )
}

export default HabitProvider

export const useHabits = ()=>{
    return useContext(HabitContext)
}