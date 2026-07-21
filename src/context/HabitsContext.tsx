import { createContext, useContext, useEffect, useState } from "react";
import { Habit } from "@/types/habit.types";
import { habitService } from "@/services/habitService";
import { winsService } from "@/services/winService";
import { useAuth } from "./AuthContext";

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
    const { isAuthenticated, isLoading: authLoading } = useAuth()

    useEffect(() => {
      if (authLoading) return
      if (!isAuthenticated) return
      fetchHabits()
      const now = new Date()
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
      getTodaysWins(today)
      }, [authLoading, isAuthenticated])

    //fetch habits
    const fetchHabits= async()=>{
        setIsLoading(true)
        try {
            const allHabits = await habitService.getHabits()
            setHabits(allHabits)
        } catch (error) {
            console.log("Couldn't fetch habits!", error)
        } finally{
        setIsLoading(false)
        }
    }

    // create habit
    const createHabit=async(payload: any)=>{
        setIsLoading(true)
        try {
            const response = await habitService.createHabit(payload)
            await fetchHabits()
        } catch (error) {
            console.log("Couldn't add habit!", error)
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
            console.log("Couldn't update habit!", error)
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
            console.log("Couldn't delete habit!", error)
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
            console.log("Couldn't get wins!", err)
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
            console.log("Couldn't complete habit!", error)
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