using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CsStorage.Data.Configuration
{
    public class DebtConfiguration : IEntityTypeConfiguration<Debt>
    {
        public void Configure(EntityTypeBuilder<Debt> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Value).HasPrecision(10, 2).IsRequired();
            builder.Property(x => x.Forecast).IsRequired().HasColumnType("date");

            builder.HasOne(x => x.Customer);
        }
    }
}