package order.service.message_broker;

@RequiredArgsConstructor
@KafkaListener(offsetReset = OffsetReset.EARLIEST)
public class PolicyRegisteredListener {
    private final PolicyAccountRepository policyAccountRepository;
    private final PolicyAccountNumberGenerator policyAccountNumberGenerator;
    @Topic("policy-registered")
    void onPolicyRegistered(PolicyRegisteredEvent event) {
        Optional accountOpt = policyAccountRepository.findForPolicy(event.getPolicy().getNumber());
        if (!accountOpt.isPresent())
            createAccount(event.getPolicy());
    }
    private void createAccount(PolicyDto policy) {
        policyAccountRepository.add(new PolicyAccount(policy.getNumber(), policyAccountNumberGenerator.generate()));
    }
}