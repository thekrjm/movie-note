import { SetStateAction } from 'react'

export interface ISortedListProps {
  query?: string
  size: number
}

export type Direction = 'DESC' | 'ASC'

export interface IHomeProps {
  searchParams: { size: number; query: string; sort: string; page: number }
}

export interface ILoginPageProps {
  closeLoginModal: () => void
}

export interface IUserInfo {
  nickname: string
  email: string
}
