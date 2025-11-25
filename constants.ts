
import { Card, CardPack, Category } from './types';

export const CATEGORIES: { label: string; value: Category }[] = [
  { label: '全部', value: 'IP' }, 
  { label: 'Coser', value: 'Coser' },
  { label: '演员', value: 'Actor' },
  { label: '歌手', value: 'Singer' },
  { label: 'IP', value: 'IP' },
  { label: '主播', value: 'Streamer' },
  { label: '舞蹈', value: 'Dance' },
  { label: '体育', value: 'Sports' },
  { label: '品牌', value: 'Brand' },
];

const SAMPLE_SUMMON_VIDEO = "https://cdn.pixabay.com/video/2023/10/22/186115-877653483_tiny.mp4";

export const MOCK_PACKS: CardPack[] = [
  {
    id: '1',
    title: '赛博朋克 2077 限定',
    coverUrl: 'https://picsum.photos/400/711?random=1',
    price: 19.99,
    category: 'IP',
    tags: ['Cyberpunk', 'Sci-Fi'],
    isHot: true,
    description: '夜之城限定典藏包，包含強尼·銀手異畫闪卡。SSR爆率提升至 5%！',
    videoUrl: SAMPLE_SUMMON_VIDEO,
    creator: {
        id: 'cdpr',
        name: 'CD PROJEKT RED',
        avatarUrl: 'https://picsum.photos/100/100?random=101'
    }
  },
  {
    id: '2',
    title: '知名 Coser 喵喵酱',
    coverUrl: 'https://picsum.photos/400/711?random=2',
    price: 29.99,
    category: 'Coser',
    tags: ['Cute', 'Exclusive'],
    isNew: true,
    description: '喵喵酱2024年首发写真卡包，每包必得一张SR以上卡片，更有亲笔签名UR等你来拿。',
    videoUrl: SAMPLE_SUMMON_VIDEO,
    creator: {
        id: 'miao',
        name: '喵喵酱',
        avatarUrl: 'https://picsum.photos/100/100?random=102'
    }
  },
  {
    id: '3',
    title: '街头舞蹈大赛集锦',
    coverUrl: 'https://picsum.photos/400/711?random=3',
    price: 9.99,
    category: 'Dance',
    tags: ['Street', 'Cool'],
    description: '收录全国街舞大赛精彩瞬间，动态卡面展示高难度地板动作。',
    videoUrl: SAMPLE_SUMMON_VIDEO,
    creator: {
        id: 'dance_cn',
        name: 'China Dance',
        avatarUrl: 'https://picsum.photos/100/100?random=103'
    }
  },
  {
    id: '4',
    title: '虚拟歌姬 - 星尘',
    coverUrl: 'https://picsum.photos/400/711?random=4',
    price: 15.99,
    category: 'Singer',
    tags: ['Virtual', 'Music'],
    isHot: true,
    description: '星尘官方授权数字收藏卡，集齐一套可兑换线下演唱会门票抽奖资格。',
    videoUrl: SAMPLE_SUMMON_VIDEO,
    creator: {
        id: 'stardust',
        name: '星尘Official',
        avatarUrl: 'https://picsum.photos/100/100?random=104'
    }
  },
  {
    id: '5',
    title: '电竞全明星',
    coverUrl: 'https://picsum.photos/400/711?random=5',
    price: 5.99,
    category: 'Sports',
    tags: ['E-Sports', 'Gaming'],
    description: 'LPL 全明星选手阵容，记录封神一战。',
    videoUrl: SAMPLE_SUMMON_VIDEO,
    creator: {
        id: 'lpl',
        name: 'LPL Official',
        avatarUrl: 'https://picsum.photos/100/100?random=105'
    }
  },
  {
    id: '6',
    title: '古风汉服大赏',
    coverUrl: 'https://picsum.photos/400/711?random=6',
    price: 12.99,
    category: 'Coser',
    tags: ['Traditional', 'Beauty'],
    description: '衣香鬓影，汉服之美。包含多位国风博主独家授权大片。',
    videoUrl: SAMPLE_SUMMON_VIDEO,
    creator: {
        id: 'hanfu',
        name: '汉服荟',
        avatarUrl: 'https://picsum.photos/100/100?random=106'
    }
  },
];

export const MOCK_COLLECTION: Card[] = [
  {
    id: 'c1',
    imageId: 'c1',
    title: '霓虹战士 - 01',
    imageUrl: 'https://picsum.photos/400/711?random=10',
    rarity: 'SSR',
    creator: 'CD PROJEKT RED',
    description: 'First edition holographic card.',
  },
  {
    id: 'c2',
    imageId: 'c2',
    title: '夏日海滩',
    imageUrl: 'https://picsum.photos/400/711?random=11',
    rarity: 'SR',
    creator: '喵喵酱',
    description: 'Summer vibes exclusive.',
  },
  {
    id: 'c3',
    imageId: 'c3',
    title: '机械之心',
    imageUrl: 'https://picsum.photos/400/711?random=12',
    rarity: 'UR',
    creator: 'FutureTech',
    description: 'Ultra rare mechanic series.',
  },
  {
    id: 'c4',
    imageId: 'c4',
    title: '樱花祭',
    imageUrl: 'https://picsum.photos/400/711?random=13',
    rarity: 'R',
    creator: 'JapanLove',
    description: 'Standard issue cherry blossom.',
  },
];
