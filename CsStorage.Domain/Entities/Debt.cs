using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Validation;

namespace CsStorage.Domain.Entities
{
    public sealed class Debt : Entity
    {
        public decimal Value { get; private set; }
        public DateTime Forecast { get; private set; }
        public DateTime? PaidDate { get; private set; }
        public Customer Customer { get; set; }
        public int CustomerId { get; set; }

        public Debt(decimal value, DateTime forecast, DateTime? paidDate)
        {
            ValidateDomain(value, forecast, paidDate);
        }

        public Debt(int id, decimal value, DateTime forecast, DateTime? paidDate)
        {
            DomainExceptionValidation.When(id < 0, "Invalid id");
            Id = id;
            ValidateDomain(value, forecast, paidDate);
        }

        private void ValidateDomain(decimal value, DateTime forecast, DateTime? paidDate)
        {
            DomainExceptionValidation.When(value < 0, "Value must be greater than 0");
            // DomainExceptionValidation.When(forecast.CompareTo(DateTime.Now) < 0, "Forecast must be greater than actual data");

            Value = value;
            Forecast = forecast;
            PaidDate = paidDate;
            CreatedAt = DateTime.UtcNow;
        }
    }
}