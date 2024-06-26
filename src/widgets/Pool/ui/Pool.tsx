import { memo, useCallback, useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import { PoolHeader } from '@/entities/PoolHeader'
import { PoolContent } from '@/features/PoolContent'
import { usePoolContentApi } from '../api/poolContentApi'
import { VStack } from '@/shared/ui/Stack'

interface PoolProps {
   className?: string
}

export const Pool = memo((props: PoolProps) => {
    const {
        className,
    } = props

    const { data } = usePoolContentApi(null)
    const [collapsed, setCollapsed] = useState<number>()

    const onCollapsed = useCallback((id: number) => {
        setCollapsed(id)
    }, [])

    if (data) {
        return (
            <div className={classNames(styles.Pool, {}, [className])}>
                <PoolHeader />
                <VStack gap="12" className={styles.PoolContent}>
                    {data.map((job, i) => (
                        <PoolContent
                            key={job.panelDesctiption + i}
                            id={i}
                            job={job}
                            collapsed={collapsed === i}
                            onCollapsed={onCollapsed}
                        />
                    ))}
                </VStack>
            </div>
        )
    }
    return null
})
