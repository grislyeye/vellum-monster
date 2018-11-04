export const xpByCrTable = {
  '0': 0,
  '⅛': 25,
  '¼': 50,
  '½': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000
}

const range = (start, end) => {
  end = end || start
  return Array.from({ length: (end - start) + 1 }, (_, i) => i + start)
}

export const monsterStatisticsByCrTable = [
  {
    cr: '0',
    ac: range(0, 13),
    hpRange: range(1, 6),
    attackBonus: range(0, 3),
    damageRange: range(0, 1)
  },
  {
    cr: '⅛',
    ac: range(13),
    hpRange: range(7, 35),
    attackBonus: range(3),
    damageRange: range(2, 3)
  },
  {
    cr: '¼',
    ac: range(13),
    hpRange: range(36, 49),
    attackBonus: range(3),
    damageRange: range(4, 5)
  },
  {
    cr: '½',
    ac: range(13),
    hpRange: range(50, 70),
    attackBonus: range(3),
    damageRange: range(6, 8)
  },
  {
    cr: '1',
    ac: range(13),
    hpRange: range(71, 85),
    attackBonus: range(3),
    damageRange: range(9, 14)
  },
  {
    cr: '2',
    ac: range(13),
    hpRange: range(86, 100),
    attackBonus: range(3),
    damageRange: range(15, 20)
  },
  {
    cr: '3',
    ac: range(13),
    hpRange: range(101, 115),
    attackBonus: range(4),
    damageRange: range(21, 26)
  },
  {
    cr: '4',
    ac: range(14),
    hpRange: range(116, 130),
    attackBonus: range(5),
    damageRange: range(27, 32)
  },
  {
    cr: '5',
    ac: range(15),
    hpRange: range(131, 145),
    attackBonus: range(6),
    damageRange: range(33, 38)
  },
  {
    cr: '6',
    ac: range(15),
    hpRange: range(146, 160),
    attackBonus: range(6),
    damageRange: range(39, 44)
  },
  {
    cr: '7',
    ac: range(15),
    hpRange: range(161, 175),
    attackBonus: range(6),
    damageRange: range(45, 50)
  },
  {
    cr: '8',
    ac: range(16),
    hpRange: range(176, 190),
    attackBonus: range(7),
    damageRange: range(51, 56)
  },
  {
    cr: '9',
    ac: range(16),
    hpRange: range(191, 205),
    attackBonus: range(7),
    damageRange: range(57, 62)
  },
  {
    cr: '10',
    ac: range(17),
    hpRange: range(206, 220),
    attackBonus: range(7),
    damageRange: range(63, 68)
  },
  {
    cr: '11',
    ac: range(17),
    hpRange: range(221, 235),
    attackBonus: range(8),
    damageRange: range(69, 74)
  },
  {
    cr: '12',
    ac: range(17),
    hpRange: range(236, 250),
    attackBonus: range(8),
    damageRange: range(75, 80)
  },
  {
    cr: '13',
    ac: range(18),
    hpRange: range(251, 265),
    attackBonus: range(8),
    damageRange: range(81, 86)
  },
  {
    cr: '14',
    ac: range(18),
    hpRange: range(266, 280),
    attackBonus: range(8),
    damageRange: range(87, 92)
  },
  {
    cr: '15',
    ac: range(18),
    hpRange: range(281, 295),
    attackBonus: range(8),
    damageRange: range(93, 98)
  },
  {
    cr: '16',
    ac: range(18),
    hpRange: range(296, 310),
    attackBonus: range(9),
    damageRange: range(99, 104)
  },
  {
    cr: '17',
    ac: range(19),
    hpRange: range(311, 325),
    attackBonus: range(10),
    damageRange: range(105, 110)
  },
  {
    cr: '18',
    ac: range(19),
    hpRange: range(326, 340),
    attackBonus: range(10),
    damageRange: range(111, 116)
  },
  {
    cr: '19',
    ac: range(19),
    hpRange: range(341, 355),
    attackBonus: range(10),
    damageRange: range(117, 122)
  },
  {
    cr: '20',
    ac: range(19),
    hpRange: range(356, 400),
    attackBonus: range(10),
    damageRange: range(123, 140)
  },
  {
    cr: '21',
    ac: range(19),
    hpRange: range(401, 445),
    attackBonus: range(11),
    damageRange: range(141, 158)
  },
  {
    cr: '22',
    ac: range(19),
    hpRange: range(446, 490),
    attackBonus: range(11),
    damageRange: range(159, 176)
  },
  {
    cr: '23',
    ac: range(19),
    hpRange: range(491, 535),
    attackBonus: range(11),
    damageRange: range(177, 194)
  },
  {
    cr: '24',
    ac: range(19),
    hpRange: range(536, 580),
    attackBonus: range(11),
    damageRange: range(195, 212)
  },
  {
    cr: '25',
    ac: range(19),
    hpRange: range(581, 625),
    attackBonus: range(12),
    damageRange: range(213, 230)
  },
  {
    cr: '26',
    ac: range(19),
    hpRange: range(626, 670),
    attackBonus: range(12),
    damageRange: range(231, 248)
  },
  {
    cr: '27',
    ac: range(19),
    hpRange: range(671, 715),
    attackBonus: range(13),
    damageRange: range(249, 266)
  },
  {
    cr: '28',
    ac: range(19),
    hpRange: range(716, 760),
    attackBonus: range(13),
    damageRange: range(267, 284)
  },
  {
    cr: '29',
    ac: range(19),
    hpRange: range(761, 805),
    attackBonus: range(13),
    damageRange: range(285, 302)
  },
  {
    cr: '30',
    ac: range(19),
    hpRange: range(806, 850),
    attackBonus: range(14),
    damageRange: range(303, 320)
  }
]
