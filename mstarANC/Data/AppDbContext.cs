using Microsoft.EntityFrameworkCore;
using MStarSupply.Models;

namespace MStarSupply.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Mercadoria> Mercadorias { get; set; }
        public DbSet<Entrada> Entradas { get; set; }
        public DbSet<Saida> Saidas { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração de chaves estrangeiras
            modelBuilder.Entity<Entrada>()
                .HasOne(e => e.Mercadoria)
                .WithMany()
                .HasForeignKey(e => e.MercadoriaId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Saida>()
                .HasOne(s => s.Mercadoria)
                .WithMany()
                .HasForeignKey(s => s.MercadoriaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
