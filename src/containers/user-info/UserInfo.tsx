'use Client'

import styles from './UserInfo.module.css'
import { getUserDataApi } from '@/api/route'
import { IUserInfo } from '@/types/types'
import { getCookie } from '@/utils/cookie'
import { useEffect, useState } from 'react'

const UserInfo = () => {
  const [myPageInfo, setMyPageInfo] = useState<IUserInfo | null>(null)
  const token = getCookie('accessToken')

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const { data } = await getUserDataApi(token)
        setMyPageInfo(data)
      }
    }
    fetchData()
  }, [])

  return (
    <main>
      <section className={styles.container}>
        <div className={styles.userInfo}>
          <img className={styles.profileImg} src="/profile.png" />
          <div>
            <div className={styles.nickname}>닉네임:{myPageInfo?.nickname}</div>
            <div className={styles.email}>Email: {myPageInfo?.email}</div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default UserInfo
