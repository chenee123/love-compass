import type { DimensionMeta, Question } from '../types'

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: 'goal',
    name: '婚恋目标',
    short: '目标',
    description: '对恋爱、结婚和长期关系的期待',
  },
  {
    id: 'standard',
    name: '择偶标准',
    short: '标准',
    description: '对伴侣条件的要求、优先级和弹性',
  },
  {
    id: 'self',
    name: '自我认知',
    short: '自我',
    description: '对个人优势、生活状态和需求的理解',
  },
  {
    id: 'relate',
    name: '关系相处',
    short: '相处',
    description: '沟通、边界、情绪表达和冲突处理偏好',
  },
  {
    id: 'reality',
    name: '现实适配',
    short: '适配',
    description: '对价值观、生活方式和未来规划的重视程度',
  },
]

// 评分说明：
// 每个选项 score 记录对五个维度的倾向分值，范围 0~3。
// 维度映射关系（用于分类）：
//   goal 高 → 稳定经营/清醒筛选（目标清晰）
//   standard 高 → 清醒筛选（择偶标准明确）
//   self 高 → 自我主导（自我认知清晰、边界感强）
//   relate 高 → 双向奔赴/感觉优先（重视关系互动与情绪）
//   reality 高 → 稳定经营/清醒筛选（重视现实适配）
// 部分题目使用反向计分（低分值对应某倾向），避免用户机械选择"看似最好"的答案。

export const QUESTIONS: Question[] = [
  // ========== 维度1：婚恋目标（goal）==========
  {
    id: 'q1',
    dimension: 'goal',
    title: '朋友问你最近在感情上想要什么，你心里第一个冒出来的答案是？',
    options: [
      {
        id: 'q1a',
        text: '遇到一个聊得来、相处舒服的人，顺其自然',
        score: { goal: 1, standard: 0, self: 0, relate: 2, reality: 0 },
      },
      {
        id: 'q1b',
        text: '想认真找一个人，朝着结婚的方向稳定下来',
        score: { goal: 3, standard: 1, self: 0, relate: 0, reality: 2 },
      },
      {
        id: 'q1c',
        text: '先把自己过好，感情是锦上添花的事',
        score: { goal: 0, standard: 0, self: 3, relate: 0, reality: 1 },
      },
      {
        id: 'q1d',
        text: '希望有一段双向认真投入、有回应的关系',
        score: { goal: 2, standard: 0, self: 0, relate: 3, reality: 0 },
      },
    ],
  },
  {
    id: 'q2',
    dimension: 'goal',
    title: '提到「理想关系」这个词，你脑海里更接近哪一种画面？',
    options: [
      {
        id: 'q2a',
        text: '两个人都清楚自己要什么，各司其职，稳稳过日子',
        score: { goal: 3, standard: 1, self: 0, relate: 0, reality: 2 },
      },
      {
        id: 'q2b',
        text: '每天都有说不完的话，想起来就开心',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q2c',
        text: '彼此独立又互相支持，谁也不拖累谁',
        score: { goal: 1, standard: 0, self: 3, relate: 1, reality: 1 },
      },
      {
        id: 'q2d',
        text: '有明确的未来规划，一起一步步往前走',
        score: { goal: 3, standard: 2, self: 0, relate: 0, reality: 2 },
      },
    ],
  },
  {
    id: 'q3',
    dimension: 'goal',
    title: '如果恋爱一年后，对方还没有任何关于未来的表态，你会？',
    options: [
      {
        id: 'q3a',
        text: '主动聊一聊，问清楚彼此对未来的想法',
        score: { goal: 3, standard: 1, self: 0, relate: 1, reality: 2 },
      },
      {
        id: 'q3b',
        text: '有点慌，担心这段关系没有方向',
        score: { goal: 2, standard: 0, self: 0, relate: 2, reality: 1 },
      },
      {
        id: 'q3c',
        text: '还好，只要现在开心，未来自然会有答案',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q3d',
        text: '尊重对方节奏，我也继续过好自己的生活',
        score: { goal: 1, standard: 0, self: 3, relate: 0, reality: 1 },
      },
    ],
  },
  {
    id: 'q4',
    dimension: 'goal',
    title: '你更希望这段关系给你的，是什么？',
    options: [
      {
        id: 'q4a',
        text: '一个可以一起规划、一起承担生活的伙伴',
        score: { goal: 3, standard: 1, self: 0, relate: 0, reality: 3 },
      },
      {
        id: 'q4b',
        text: '被喜欢、被回应，确定自己是对方在意的人',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q4c',
        text: '心动和新鲜感，让生活变得更有意思',
        score: { goal: 0, standard: 0, self: 1, relate: 2, reality: 0 },
      },
      {
        id: 'q4d',
        text: '保留自己的空间，同时有人理解我',
        score: { goal: 1, standard: 0, self: 3, relate: 1, reality: 1 },
      },
    ],
  },

  // ========== 维度2：择偶标准（standard）==========
  {
    id: 'q5',
    dimension: 'standard',
    title: '遇到一个各方面都挺不错，但聊天时没有特别心动的人，你会？',
    options: [
      {
        id: 'q5a',
        text: '先相处看看，感觉可以慢慢培养',
        score: { goal: 1, standard: 0, self: 0, relate: 2, reality: 1 },
      },
      {
        id: 'q5b',
        text: '没心动就不勉强，感情不能将就',
        score: { goal: 0, standard: 0, self: 1, relate: 2, reality: 0 },
      },
      {
        id: 'q5c',
        text: '条件合适很难得，可以认真了解一下',
        score: { goal: 2, standard: 3, self: 0, relate: 0, reality: 2 },
      },
      {
        id: 'q5d',
        text: '先搞清楚自己对「心动」到底在期待什么',
        score: { goal: 1, standard: 1, self: 3, relate: 0, reality: 1 },
      },
    ],
  },
  {
    id: 'q6',
    dimension: 'standard',
    title: '对方有一个你不太满意的条件，但其他方面都很合适，你会怎么考虑？',
    options: [
      {
        id: 'q6a',
        text: '列出利弊，看这个条件会不会影响长期生活',
        score: { goal: 2, standard: 3, self: 0, relate: 0, reality: 2 },
      },
      {
        id: 'q6b',
        text: '如果感情到位，这点小事可以包容',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q6c',
        text: '看自己能不能接受，接受不了就趁早说清楚',
        score: { goal: 1, standard: 2, self: 2, relate: 0, reality: 1 },
      },
      {
        id: 'q6d',
        text: '不急着下结论，先看看其他方面是否真的合适',
        score: { goal: 1, standard: 1, self: 0, relate: 1, reality: 2 },
      },
    ],
  },
  {
    id: 'q7',
    dimension: 'standard',
    title: '在择偶时，你最不容易妥协的是下面哪一项？',
    options: [
      {
        id: 'q7a',
        text: '价值观和人生方向是否一致',
        score: { goal: 2, standard: 3, self: 0, relate: 0, reality: 3 },
      },
      {
        id: 'q7b',
        text: '两个人有没有真的喜欢彼此',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q7c',
        text: '相处起来舒不舒服、累不累',
        score: { goal: 1, standard: 0, self: 1, relate: 2, reality: 1 },
      },
      {
        id: 'q7d',
        text: '对方是否尊重我的生活节奏和边界',
        score: { goal: 1, standard: 1, self: 3, relate: 1, reality: 1 },
      },
    ],
  },
  {
    id: 'q8',
    dimension: 'standard',
    title: '如果让你给「合适的另一半」排个序，你会把哪一项放在最前面？',
    options: [
      {
        id: 'q8a',
        text: '三观合、能一起面对现实问题',
        score: { goal: 2, standard: 3, self: 0, relate: 0, reality: 3 },
      },
      {
        id: 'q8b',
        text: '对我好、有回应、愿意为我付出',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q8c',
        text: '有吸引力，相处有火花',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q8d',
        text: '情绪稳定、让人安心，不折腾',
        score: { goal: 2, standard: 1, self: 1, relate: 0, reality: 2 },
      },
    ],
  },

  // ========== 维度3：自我认知（self）==========
  {
    id: 'q9',
    dimension: 'self',
    title: '单身的时候，你的周末通常是怎样的？',
    options: [
      {
        id: 'q9a',
        text: '安排得满满当当，独处也能自得其乐',
        score: { goal: 0, standard: 0, self: 3, relate: 0, reality: 1 },
      },
      {
        id: 'q9b',
        text: '偶尔有点空落，会想找人说说话',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q9c',
        text: '按部就班地过，健身、做饭、早睡',
        score: { goal: 1, standard: 0, self: 1, relate: 0, reality: 2 },
      },
      {
        id: 'q9d',
        text: '不太固定，随心情，想去哪就去哪',
        score: { goal: 0, standard: 0, self: 1, relate: 2, reality: 0 },
      },
    ],
  },
  {
    id: 'q10',
    dimension: 'self',
    title: '回顾过去的感情经历，你觉得最需要改变的是？',
    options: [
      {
        id: 'q10a',
        text: '太快投入，应该先看清楚人',
        score: { goal: 1, standard: 2, self: 1, relate: 0, reality: 1 },
      },
      {
        id: 'q10b',
        text: '太容易迁就别人，忽略了自己的需求',
        score: { goal: 0, standard: 0, self: 3, relate: 0, reality: 0 },
      },
      {
        id: 'q10c',
        text: '害怕冲突，很多话憋着没说出口',
        score: { goal: 0, standard: 0, self: 1, relate: 3, reality: 0 },
      },
      {
        id: 'q10d',
        text: '想太多现实问题，反而错过了心动',
        score: { goal: 0, standard: 0, self: 0, relate: 2, reality: 0 },
      },
    ],
  },
  {
    id: 'q11',
    dimension: 'self',
    title: '你觉得自己在感情里，最拿得出手的一项优势是？',
    options: [
      {
        id: 'q11a',
        text: '情绪稳定，遇到问题能理性沟通',
        score: { goal: 2, standard: 1, self: 2, relate: 1, reality: 1 },
      },
      {
        id: 'q11b',
        text: '真诚投入，愿意为喜欢的人花心思',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q11c',
        text: '清楚自己要什么，不会轻易迷失',
        score: { goal: 2, standard: 2, self: 3, relate: 0, reality: 1 },
      },
      {
        id: 'q11d',
        text: '有趣、有生活，能给关系带来新鲜感',
        score: { goal: 0, standard: 0, self: 2, relate: 2, reality: 0 },
      },
    ],
  },
  {
    id: 'q12',
    dimension: 'self',
    title: '如果现在让你开始一段关系，你更看重自己当下的状态是？',
    options: [
      {
        id: 'q12a',
        text: '我已经准备好了，生活稳定、心态成熟',
        score: { goal: 2, standard: 1, self: 3, relate: 0, reality: 2 },
      },
      {
        id: 'q12b',
        text: '我渴望被爱，也愿意去爱',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q12c',
        text: '我过得很好，爱情是加分不是必需品',
        score: { goal: 0, standard: 0, self: 3, relate: 0, reality: 1 },
      },
      {
        id: 'q12d',
        text: '我还在探索，想先找到对的人',
        score: { goal: 1, standard: 0, self: 0, relate: 2, reality: 0 },
      },
    ],
  },

  // ========== 维度4：关系相处（relate）==========
  {
    id: 'q13',
    dimension: 'relate',
    title: '你和另一半因为一件小事有了分歧，你更习惯怎么处理？',
    options: [
      {
        id: 'q13a',
        text: '当面把话说开，哪怕会有点尴尬',
        score: { goal: 1, standard: 0, self: 1, relate: 2, reality: 0 },
      },
      {
        id: 'q13b',
        text: '先冷静一下，等情绪过去再聊',
        score: { goal: 1, standard: 0, self: 2, relate: 1, reality: 1 },
      },
      {
        id: 'q13c',
        text: '能忍则忍，不想为小事伤感情',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q13d',
        text: '讲道理，分析清楚谁对谁错',
        score: { goal: 1, standard: 1, self: 1, relate: 0, reality: 2 },
      },
    ],
  },
  {
    id: 'q14',
    dimension: 'relate',
    title: '对方在你忙碌时频繁发消息、表达想念，你的真实反应更接近？',
    options: [
      {
        id: 'q14a',
        text: '有点甜，但也希望对方能理解我忙',
        score: { goal: 0, standard: 0, self: 2, relate: 1, reality: 1 },
      },
      {
        id: 'q14b',
        text: '很开心，说明对方心里有我',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q14c',
        text: '会尽量抽空回复，不想让对方失落',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q14d',
        text: '希望双方都能有自己的节奏，不用时刻在线',
        score: { goal: 1, standard: 0, self: 3, relate: 0, reality: 1 },
      },
    ],
  },
  {
    id: 'q15',
    dimension: 'relate',
    title: '在关系里，你觉得自己最受不了的是？',
    options: [
      {
        id: 'q15a',
        text: '忽冷忽热，态度不稳定',
        score: { goal: 1, standard: 0, self: 0, relate: 2, reality: 0 },
      },
      {
        id: 'q15b',
        text: '对方不尊重我的个人空间',
        score: { goal: 0, standard: 0, self: 3, relate: 0, reality: 1 },
      },
      {
        id: 'q15c',
        text: '缺乏回应，付出得不到对等的重视',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q15d',
        text: '没有责任感，遇事就逃避',
        score: { goal: 2, standard: 1, self: 0, relate: 0, reality: 2 },
      },
    ],
  },
  {
    id: 'q16',
    dimension: 'relate',
    title: '你理想中和伴侣的日常相处，更偏向哪种？',
    options: [
      {
        id: 'q16a',
        text: '黏在一起，分享生活里的各种小事',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q16b',
        text: '各自有空间，偶尔高质量地相处',
        score: { goal: 1, standard: 0, self: 3, relate: 0, reality: 1 },
      },
      {
        id: 'q16c',
        text: '一起做事情、一起规划，有商有量',
        score: { goal: 2, standard: 1, self: 0, relate: 1, reality: 2 },
      },
      {
        id: 'q16d',
        text: '像朋友一样舒服，有话直说',
        score: { goal: 1, standard: 0, self: 1, relate: 2, reality: 1 },
      },
    ],
  },

  // ========== 维度5：现实适配（reality）==========
  {
    id: 'q17',
    dimension: 'reality',
    title: '谈恋爱时，你会更在意两个人以下哪方面的匹配？',
    options: [
      {
        id: 'q17a',
        text: '消费观、金钱观是否一致',
        score: { goal: 2, standard: 2, self: 0, relate: 0, reality: 3 },
      },
      {
        id: 'q17b',
        text: '生活习惯、作息节奏是否合拍',
        score: { goal: 1, standard: 1, self: 0, relate: 0, reality: 3 },
      },
      {
        id: 'q17c',
        text: '有没有共同话题和相似的生活态度',
        score: { goal: 1, standard: 0, self: 0, relate: 2, reality: 1 },
      },
      {
        id: 'q17d',
        text: '彼此是否尊重对方原来的生活方式',
        score: { goal: 1, standard: 0, self: 2, relate: 1, reality: 2 },
      },
    ],
  },
  {
    id: 'q18',
    dimension: 'reality',
    title: '关于「未来的城市、职业、家庭」，你的态度更接近？',
    options: [
      {
        id: 'q18a',
        text: '这些最好早点和对方对齐，避免以后麻烦',
        score: { goal: 2, standard: 2, self: 0, relate: 0, reality: 3 },
      },
      {
        id: 'q18b',
        text: '可以边走边看，感情到了自然会商量',
        score: { goal: 1, standard: 0, self: 0, relate: 2, reality: 1 },
      },
      {
        id: 'q18c',
        text: '我有自己的规划，也希望对方有自己的',
        score: { goal: 1, standard: 0, self: 3, relate: 0, reality: 2 },
      },
      {
        id: 'q18d',
        text: '只要两个人愿意，什么都能一起克服',
        score: { goal: 1, standard: 0, self: 0, relate: 3, reality: 0 },
      },
    ],
  },
  {
    id: 'q19',
    dimension: 'reality',
    title: '如果对方和你理想中的「条件」不太一样，你会？',
    options: [
      {
        id: 'q19a',
        text: '分清哪些是底线、哪些可以商量',
        score: { goal: 1, standard: 3, self: 1, relate: 0, reality: 2 },
      },
      {
        id: 'q19b',
        text: '看感情，感情好其他都能慢慢磨合',
        score: { goal: 0, standard: 0, self: 0, relate: 3, reality: 0 },
      },
      {
        id: 'q19c',
        text: '不太在意「条件」，相处舒服更重要',
        score: { goal: 0, standard: 0, self: 1, relate: 2, reality: 0 },
      },
      {
        id: 'q19d',
        text: '会认真评估差异带来的实际影响',
        score: { goal: 2, standard: 1, self: 0, relate: 0, reality: 3 },
      },
    ],
  },
  {
    id: 'q20',
    dimension: 'reality',
    title: '你更希望伴侣和自己拥有相似的生活节奏，还是互相补充？',
    options: [
      {
        id: 'q20a',
        text: '相似更好，省去很多磨合的麻烦',
        score: { goal: 1, standard: 1, self: 0, relate: 0, reality: 3 },
      },
      {
        id: 'q20b',
        text: '互补更有意思，能看到不一样的世界',
        score: { goal: 0, standard: 0, self: 1, relate: 2, reality: 0 },
      },
      {
        id: 'q20c',
        text: '核心节奏要合，细节可以互补',
        score: { goal: 2, standard: 1, self: 0, relate: 0, reality: 2 },
      },
      {
        id: 'q20d',
        text: '无所谓，只要彼此尊重、互不勉强',
        score: { goal: 1, standard: 0, self: 2, relate: 1, reality: 1 },
      },
    ],
  },
]
