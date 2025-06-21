using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Validation;

namespace CsStorage.Domain.Entities
{
    public class Address : Entity
    {
        public string Road { get; protected set; }
        public string Number { get; private set; }
        public string Complement { get; private set; }
        public string Neighborhood { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }

        public Address(string road, string number, string complement, string neighborhood, string city, string state)
        {
            ValidateDomain(road, number, complement, neighborhood, city, state);
        }

        public Address(int id, string road, string number, string complement, string neighborhood, string city, string state)
        {
            DomainExceptionValidation.When(id < 0, "Invalid id");
            Id = id;
            ValidateDomain(road, number, complement, neighborhood, city, state);
        }

        private void ValidateDomain(string road, string number, string complement, string neighborhood, string city, string state)
        {
            DomainExceptionValidation.When(string.IsNullOrEmpty(road), "Road is required!");
            DomainExceptionValidation.When(string.IsNullOrEmpty(number), "Number is required!");

            Road = road;
            Number = number;
            Complement = complement;
            Neighborhood = neighborhood;
            City = city;
            State = state;
            CreatedAt = DateTime.UtcNow;
        }
    }
}