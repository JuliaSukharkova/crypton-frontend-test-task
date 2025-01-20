import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loader: React.FC<SkeletonProps> = ({ className, ...props }) => {
	return <Skeleton baseColor='#F6F6F8' highlightColor='#DFE0E7' className={`!rounded-2xl h-[52px] ${className}`} {...props} />
}

export default Loader
