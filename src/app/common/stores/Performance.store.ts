import { action, observable, computed } from 'mobx';

class PerformanceStore {
    @observable all_performances: Record<string, any> = {};
    @observable requested_flags: Record<string, string> = {};
    @observable sorted_operators: Record<string, any> = {};

    @computed
    get performances() {
        return this.all_performances;
    }

    @action.bound
    setRequestedFlag(name: string, status: string) {
        this.requested_flags[name] = status;
    }

    @action.bound
    setSortedOperators(validator: string, period: string, operators: any[]) {
        this.sorted_operators[`${validator}_${period}`] = operators;
    }

    @action.bound
    getSortedOperators(validator: string, period: string) {
        return this.sorted_operators[`${validator}_${period}`] || [];
    }

    @computed
    get requestedFlags() {
        return this.requested_flags;
    }

    @action.bound
    getOperatorPerformance(operator: string, period: string) {
        return this.all_performances[`operator_${operator}_${period}`];
    }

    @action.bound
    getValidatorOperatorPerformance(validator: string, period: string, operator: string) {
        return this.all_performances[`validator_operator_${validator}_${period}_${operator}`];
    }

    @action.bound
    setOperatorPerformance(operator: string, period: string, performance: number) {
        this.all_performances[`operator_${operator}_${period}`] = performance;
    }

    @action.bound
    setValidatorOperatorPerformance(validator: string, period: string, operator: string, performance: number) {
        this.all_performances[`validator_operator_${validator}_${period}_${operator}`] = performance;
    }
}

export default PerformanceStore;
