/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_max.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/19 15:05:41 by chzabakh          #+#    #+#             */
/*   Updated: 2021/05/02 15:50:28 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

int	ft_max(int *tab, size_t len)
{
	size_t	i;
	int		max;

	max = tab[0];
	i = 0;
	while (i < len - 1)
	{
		if (tab[i + 1] > max)
		{
			max = tab[i + 1];
		}
		i++;
	}
	return (max);
}