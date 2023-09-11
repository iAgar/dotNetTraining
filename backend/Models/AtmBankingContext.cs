using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace atmBanking.Models;

public partial class AtmBankingContext : DbContext
{
    public AtmBankingContext()
    {
    }

    public AtmBankingContext(DbContextOptions<AtmBankingContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<RegisteredUser> RegisteredUsers { get; set; }

    public virtual DbSet<Txn> Txns { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=WINDOWS-BVQNF6J;Database=atmBanking;Trusted_Connection=True;encrypt=false;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Aid).HasName("PK__account__DE508E2EDC5B1482");

            entity.ToTable("account");

            entity.Property(e => e.Aid).HasColumnName("aid");
            entity.Property(e => e.AccType)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("accType");
            entity.Property(e => e.Balance).HasColumnName("balance");
            entity.Property(e => e.HomeBranch)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("homeBranch");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.User).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("FK__account__userid__276EDEB3");
        });

        modelBuilder.Entity<RegisteredUser>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PK__Register__CBA1B257BA693183");

            entity.ToTable("RegisteredUser");

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Dob)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("dob");
            entity.Property(e => e.Email)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Proof)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("proof");
            entity.Property(e => e.Uname)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("uname");
        });

        modelBuilder.Entity<Txn>(entity =>
        {
            entity.HasKey(e => e.Tid).HasName("PK__txn__DC105B0F7915C617");

            entity.ToTable("txn");

            entity.Property(e => e.Tid).HasColumnName("tid");
            entity.Property(e => e.Aid).HasColumnName("aid");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Loc)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("loc");
            entity.Property(e => e.TxnTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("txnTime");
            entity.Property(e => e.TxnType)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("txnType");

            entity.HasOne(d => d.AidNavigation).WithMany(p => p.Txns)
                .HasForeignKey(d => d.Aid)
                .HasConstraintName("FK__txn__aid__2A4B4B5E");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
