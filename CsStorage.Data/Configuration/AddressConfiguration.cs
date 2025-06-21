using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CsStorage.Data.Configuration
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Road).HasMaxLength(100).IsRequired();
            builder.Property(x => x.Number).HasMaxLength(10).IsRequired();
            builder.Property(x => x.Complement).HasMaxLength(30);
            builder.Property(x => x.Neighborhood).HasMaxLength(50);
            builder.Property(x => x.City).HasMaxLength(50);
            builder.Property(x => x.State).HasMaxLength(50);

            builder.HasData(
                new Address(1, "Road Three", "12N", "", "Saint Mary", "Some American City", "NY")
            );
        }
    }
}