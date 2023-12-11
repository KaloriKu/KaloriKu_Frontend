import { MakananData } from '@/common/types/MakananData';

export interface MakananDikonsumsiData{
    details: any;
    timeStamp: string;
    totalKalori: number;
    totalLemak: number;
    totalKarbohidrat: number;
    totalProtein: number;
    makanan: MakananData[];
}