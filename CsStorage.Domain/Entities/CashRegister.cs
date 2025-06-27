using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Enums;
using CsStorage.Domain.Validation;

namespace CsStorage.Domain.Entities
{
    public class CashRegister : Entity
    {
        public PaymentType PaymentType { get; set; }
        public decimal Value { get; private set; }
        public string Description { get; private set; }

        public CashRegister(PaymentType paymentType, decimal value, string description)
        {
            ValidateDomain(paymentType, value, description);
        }

        public CashRegister(int id, PaymentType paymentType, decimal value, string description)
        {
            DomainExceptionValidation.When(id < 0, "Invalid id");
            Id = id;
            ValidateDomain(paymentType, value, description);
        }

        private void ValidateDomain(PaymentType paymentType, decimal value, string description)
        {
            DomainExceptionValidation.When(value < 0, "Value must be greather than 0");
            DomainExceptionValidation.When(string.IsNullOrEmpty(description), "Description cannot be null");
        }
    }
}