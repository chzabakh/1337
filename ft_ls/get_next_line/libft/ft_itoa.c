/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_itoa.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/15 18:49:14 by chzabakh          #+#    #+#             */
/*   Updated: 2021/05/02 15:48:22 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

int	calc(int *length)
{
	int		size;

	size = 1;
	while (*length / 10)
	{
		*length = *length / 10;
		size++;
	}
	return (size);
}

char	*ft_itoa(int n)
{
	int		size;
	int		sign;
	int		length;
	char	*fresh;

	size = 1;
	sign = 0;
	length = n;
	if (n < 0)
		sign = 1;
	size = calc(&length);
	fresh = ft_strnew(size + sign);
	if (fresh == NULL)
		return (NULL);
	if (sign == 1)
		fresh[0] = '-';
	while (size--)
	{
		if (sign == 1)
			fresh[size + sign] = -(n % 10) + 48;
		else
			fresh[size + sign] = (n % 10) + 48;
		n = n / 10;
	}
	return (fresh);
}
