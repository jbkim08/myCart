import React from 'react';
import HeroSection from './HeroSection';
import iphone from '../../assets/iphone-14-pro.webp';
import mac from '../../assets/mac-system-cut.jfif';
import FeaturedProducts from './FeaturedProducts';

const HomePage = () => {
	return (
		<div>
			<HeroSection
				title='아이폰 14 프로 그 이상'
				subtitle='Experience the power of the latest iPhone 14 with our most Pro camera ever.'
				link='/product/64fbedd76b9bf5f33fea3945'
				image={iphone}
			/>

			<FeaturedProducts />

			<HeroSection
				title='궁극의 장비를 세팅하세요'
				subtitle='You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini.'
				link='/product/64fbedd76b9bf5f33fea394d'
				image={mac}
			/>
		</div>
	);
};

export default HomePage;
