using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Interfaces;

namespace Web.API.Abstraction;

public abstract class BaseQueryResult<TResult> : IQueryResult<TResult>
{
    public TResult? Value { get; }
    public bool IsSuccess { get; } = true;
    public Exception? Exception { get; }
    public string? ErrorMessage { get; }

    protected BaseQueryResult(TResult? value)
    {
        Value = value;
    }

    protected BaseQueryResult(TResult? value, bool isSuccess = true, Exception? exception = null, string? errorMessage = null)
    {
        Value = value;
        IsSuccess = isSuccess;
        Exception = exception;
        ErrorMessage = errorMessage;
    }

    protected BaseQueryResult(Exception? exception, string? errorMessage)
    {
        IsSuccess = false;
        Exception = exception;
        ErrorMessage = errorMessage;
    }

    protected BaseQueryResult(Exception? exception)
    {
        IsSuccess = false;
        Exception = exception;
    }
}