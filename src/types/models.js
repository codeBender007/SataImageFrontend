/**
 * @typedef {Object} ProductionLog
 * @property {number} id
 * @property {string} date - YYYY-MM-DD
 * @property {string} shift - 'A' | 'B' | 'C'
 * @property {string} machineNo
 * @property {string} qaCell
 * @property {string} operationNumber
 * @property {string} partNo1
 * @property {string} partNo2
 * @property {string} plan1 - plan for part 1
 * @property {string} plan2 - plan for part 2
 * @property {string} employeeNumbers - comma-separated
 * @property {number} scheduledQuantity
 * @property {string} page
 * @property {number} totalProduction
 * @property {number} totalLossMin
 * @property {string} uploadedBy
 * @property {string} uploadedById
 * @property {string} supervisorName
 * @property {string} shiftIncharge
 * @property {string} entryPersonName
 * @property {string} pdiOkPart1
 * @property {string} pdiOkPart2
 * @property {string} abnormalityToolChange
 * @property {string} otherAbnormality
 * @property {HourlyProductionEntry} hourlyProduction
 * @property {TPMLossEntry[]} tpmLosses
 */

/**
 * @typedef {Object} HourlyProductionEntry
 * @property {string} uph - Units per hour target
 * @property {Object.<string, string>} part1Production - { hr1: '', hr2: '', ... hr9: '', total: '' }
 * @property {Object.<string, string>} part1CastingRej
 * @property {Object.<string, string>} part1MachiningRej
 * @property {Object.<string, string>} part1UnprocessedRej
 * @property {Object.<string, string>} part2Production
 * @property {Object.<string, string>} part2CastingRej
 * @property {Object.<string, string>} part2MachiningRej
 * @property {Object.<string, string>} part2UnprocessedRej
 */

/**
 * @typedef {Object} TPMLossEntry
 * @property {string} code - e.g. 'BD', 'ST', 'SU', 'SL', 'MS', 'ML', 'LL', 'LD', 'AD', 'PS', 'UR', 'UL', 'TC', 'SA'
 * @property {string} category - 'Breakdown (BD)', 'Set up (ST)', etc.
 * @property {string} description
 * @property {Object.<string, string>} hourlyValues - { hr1: '', hr2: '', ... hr9: '' }
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} fullName
 * @property {string} role - 'admin' | 'employee'
 * @property {string} department
 * @property {string} createdDate
 * @property {string} status - 'active' | 'inactive'
 */

export const HOUR_COLUMNS = ['uph', 'hr1', 'hr2', 'hr3', 'hr4', 'hr5', 'hr6', 'hr7', 'hr8', 'hr9', 'total'];
export const HOUR_LABELS = ['UPH', 'Hr1', 'Hr2', 'Hr3', 'Hr4', 'Hr5', 'Hr6', 'Hr7', 'Hr8', 'Hr9', 'Total'];
export const OP_SLOTS = ['10', '20', '30', '40', '50', '60', '70', '80', '90'];

export const TPM_LOSS_CATEGORIES = [
  // Breakdown (BD)
  { code: 'BD', group: 'Breakdown (BD)', description: 'Breakdown-Mech. (Details on next page)' },
  { code: 'BD', group: 'Breakdown (BD)', description: 'Breakdown-Elect. (Details on next page)' },
  { code: 'BD', group: 'Breakdown (BD)', description: 'Breakdown-Hydraulic' },
  { code: 'BD', group: 'Breakdown (BD)', description: 'Breakdown-Fixture' },
  // Set up (ST)
  { code: 'BD', group: 'Set up (ST)', description: 'Fixture change (For same part)' },
  { code: 'SA', group: 'Set up (ST)', description: 'Setting change (Both Tool & Fixture)' },
  { code: 'TC', group: 'Set up (ST)', description: 'Tool change (Replacement/breakage)' },
  { code: 'SA', group: 'Set up (ST)', description: 'Program (Next part) change' },
  // Start up (SU)
  { code: 'SU', group: 'Start up (SU)', description: 'Startup after Breakdown' },
  { code: 'SU', group: 'Start up (SU)', description: 'Startup after tool change' },
  { code: 'SU', group: 'Start up (SU)', description: 'Start up after planned stoppage' },
  { code: 'SU', group: 'Start up (SU)', description: 'Power failure & start up after that' },
  // Speed loss (MS)
  { code: 'SL', group: 'Speed loss (MS)', description: 'Speed loss: Lower CT/Partial BD M/c' },
  { code: 'SL', group: 'Speed loss (MS)', description: 'Speed loss: Untrained person' },
  { code: 'MS', group: 'Speed loss (MS)', description: 'Tool buildup' },
  { code: 'MS', group: 'Speed loss (MS)', description: 'Slow running with Minor stoppages' },
  // Waiting (ML)
  { code: 'ML', group: 'Waiting (ML)', description: 'Waiting: Casting' },
  { code: 'ML', group: 'Waiting (ML)', description: 'Waiting: Child parts/ED part' },
  { code: 'ML', group: 'Waiting (ML)', description: 'Waiting: Tool / Fixture' },
  { code: 'LL', group: 'Waiting (ML)', description: 'Waiting: Trolley/Packing box/Pallet' },
  // Delay (DL)
  { code: 'LD', group: 'Delay (DL)', description: 'Meeting/ Discussion with supervisor' },
  { code: 'AD', group: 'Delay (DL)', description: 'Delay: Issue analysis/adjustment' },
  { code: 'ML', group: 'Delay (DL)', description: 'Delay: Getting Lab report' },
  { code: 'ML', group: 'Delay (DL)', description: 'Delay: Consumable (coolant)' },
  // Oth.Loss (OL)
  { code: 'PS', group: 'Oth.Loss (OL)', description: 'Machine cleaning' },
  { code: 'ML', group: 'Oth.Loss (OL)', description: 'Manpower not available' },
  { code: 'UR', group: 'Oth.Loss (OL)', description: 'Power failure' },
  { code: 'UL', group: 'Oth.Loss (OL)', description: 'Utility loss (Air/water supply failure)' },
  // Pl.Loss (PL)
  { code: 'PS', group: 'Pl.Loss (PL)', description: 'PPC No schedule/Planned stoppage' },
  { code: 'PS', group: 'Pl.Loss (PL)', description: 'PM/Reconditioning' },
  { code: 'PS', group: 'Pl.Loss (PL)', description: 'Lunch (L) /Tea (T) stoppage (write L/T)' },
];

export function createEmptyFormData() {
  const emptyHours = () => ({ hr1: '', hr2: '', hr3: '', hr4: '', hr5: '', hr6: '', hr7: '', hr8: '', hr9: '', total: '' });

  return {
    id: null,
    date: '',
    shift: '',
    machineNo: '',
    qaCell: '',
    operationNumber: '',
    partNo1: '',
    partNo2: '',
    plan1: '',
    plan2: '',
    employeeNumbers: '',
    scheduledQuantity: '',
    page: 'A',
    uph: '',
    part1Production: emptyHours(),
    part1CastingRej: emptyHours(),
    part1MachiningRej: emptyHours(),
    part1UnprocessedRej: emptyHours(),
    part2Production: emptyHours(),
    part2CastingRej: emptyHours(),
    part2MachiningRej: emptyHours(),
    part2UnprocessedRej: emptyHours(),
    supervisorName: '',
    shiftIncharge: '',
    entryPersonName: '',
    pdiOkPart1: '',
    pdiOkPart2: '',
    abnormalityToolChange: '',
    otherAbnormality: '',
    tpmLosses: TPM_LOSS_CATEGORIES.map(cat => ({
      ...cat,
      hourlyValues: { hr1: '', hr2: '', hr3: '', hr4: '', hr5: '', hr6: '', hr7: '', hr8: '', hr9: '' },
    })),
    totalLossMin: 0,
    totalProduction: 0,
    uploadedBy: '',
    uploadedById: '',
  };
}
